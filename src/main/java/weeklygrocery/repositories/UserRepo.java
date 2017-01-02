package weeklygrocery.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import weeklygrocery.beans.User;

public interface UserRepo extends PagingAndSortingRepository<User, Long> {

	@Query("select case when count(u) > 0 then true else false end from User u where u.username = :username")
	boolean existsByUsername(@Param("username") String username);

	Optional<User> findByUsername(String username);
}
