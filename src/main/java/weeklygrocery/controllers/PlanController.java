package weeklygrocery.controllers;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import weeklygrocery.beans.Item;
import weeklygrocery.beans.Plan;
import weeklygrocery.repositories.ItemRepo;
import weeklygrocery.repositories.PlanRepo;
import weeklygrocery.util.Util;

@RestController
@RequestMapping("/api/plans")
public class PlanController {

	private PlanRepo planRepo;
	private ItemRepo itemRepo;

	public PlanController(PlanRepo planRepo, ItemRepo itemRepo) {
		super();
		this.planRepo = planRepo;
		this.itemRepo = itemRepo;
	}

	@GetMapping
	@PreAuthorize("hasRole('ROLE_USER')")
	public ResponseEntity<?> list() {
		List<Plan> plans = planRepo.findFirst10ByUserIdOrderByIdDesc(Util.currentUser().get().getId());
		return ResponseEntity.ok(plans);
	}

	@GetMapping("{id}")
	@PreAuthorize("hasRole('ROLE_USER')")
	public ResponseEntity<?> get(@PathVariable("id") Long id) {
		Plan plan = planRepo.findOne(id);
		List<Item> items = plan.getItems();
		return ResponseEntity.ok(new Object[] { plan, items });
	}

	@PostMapping
	@PreAuthorize("hasRole('ROLE_USER')")
	public ResponseEntity<?> add(@RequestBody @Valid Plan plan) {
		return saveOrUpdate(plan);
	}

	@PutMapping
	@PreAuthorize("hasRole('ROLE_USER')")
	public ResponseEntity<?> update(@RequestBody @Valid Plan plan) {
		return saveOrUpdate(plan);
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_USER')")
	public ResponseEntity<?> remove(@PathVariable("id") Long id) {
//		planRepo.delete(id);
		return ResponseEntity.ok().build();
	}

	@GetMapping("/items/{search}")
	@PreAuthorize("hasRole('ROLE_USER')")
	public ResponseEntity<?> getDistinctItemNames(@PathVariable("search") String search) {
		Set<String> result = new HashSet<>(); 
		result.addAll(itemRepo.getAllDistinctNamesForCurrentUser(search));
		result.addAll(itemRepo.getAllDistinctNames(search));
		return ResponseEntity.ok(result);
	}

	/// --- private
	private ResponseEntity<?> saveOrUpdate(Plan plan) {
		plan.setUser(Util.currentUser().get());
		plan.getItems().forEach(i -> i.setPlan(plan));
		plan.setModifiedDate(LocalDateTime.now());
		planRepo.save(plan);
		return ResponseEntity.ok().build();
	}

}
