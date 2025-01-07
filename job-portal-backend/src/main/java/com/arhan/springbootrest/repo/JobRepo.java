package com.arhan.springbootrest.repo;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.arhan.springbootrest.model.JobPost;


@Repository
public interface JobRepo extends JpaRepository<JobPost, Long> {

	List<JobPost> findByPostProfileContainingOrPostDescContaining(String postProfile, String postDesc);

	@Query(value = "SELECT * FROM job_post WHERE " +
			// Search post description column for match with any keyword
			"(post_desc ILIKE ANY (ARRAY[:keywords]) OR " +
			// Search post profile column for match with any keyword
			" post_profile ILIKE ANY (ARRAY[:keywords]) OR " +
			// Search location column for match with any keyword
			" location ILIKE ANY (ARRAY[:keywords]) OR " +
			// Search company column for match with any keyword
			" company ILIKE ANY (ARRAY[:keywords]))",
			nativeQuery = true)
	List<JobPost> searchByKeywords(@Param("keywords") List<String> keywords);
}
