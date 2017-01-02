package weeklygrocery.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import weeklygrocery.beans.Item;

public interface ItemRepo extends PagingAndSortingRepository<Item, Long> {

	@Query("select distinct i.name from Item i where i.name like %:search%")
	List<String> getAllDistinctNames(@Param("search") String search);

	@Query("select distinct i.name from Item i join i.plan p join p.user u where u.username = ?#{principal.username} and i.name like %:search%")
	List<String> getAllDistinctNamesForCurrentUser(@Param("search") String search);
}
