package com.arhan.springbootrest.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.arhan.springbootrest.model.JobPost;
import com.arhan.springbootrest.service.JobService;

@RestController	
@CrossOrigin(origins = "http://localhost:3000")
public class JobRestController {
	
	@Autowired
	private JobService service;

	//@Value("${adzuna.api.key}") //GIVES ERROR FIX LATER
	// Adzuna API key
	private String appKey = "f74d4be22163898730057fbbcb98e0f7";

	//@Value("${adzuna.app.id}") //GIVES ERROR FIX LATER
	// Adzuna API ID
	private String appId = "5bf1a997";

	// Endpoint to import jobs from Adzuna API
	@GetMapping("/importJobs")
	public List<JobPost> importJobs(
			@RequestParam(required = false) String what, //this is optional
			@RequestParam(defaultValue = "1") int pageNumber, //configure at the end!
			//@RequestParam(required = false) String what, // already have
			@RequestParam(defaultValue = "nl") String country,
			@RequestParam(defaultValue = "") String where,
			@RequestParam(defaultValue = "0") Integer salary_min, //minSalary (salary in postgres)
			@RequestParam(defaultValue = "") String company,
			@RequestParam(defaultValue = "10") int resultsPerPage
	) {
		return service.importJobsFromAdzuna(what, country, where, salary_min, company, appId, appKey, resultsPerPage);
		//return "Jobs imported successfully!";
		//return "where " + where;
	}





	// Search and return a list of JobPosts based on imput keyword string passed
	@GetMapping("/searchCurrentJobs/{keyword}")
	public List<JobPost> searchCurrentJobs(@PathVariable("keyword") String keyword)
	{
		return service.searchCurrentJobs(keyword);
		// Returns list of jobs matching search query
	}
	

	@GetMapping("jobPosts")
	public List<JobPost> getAllJobs() {
		return service.getAllJobs();
		
	}
	
	
	
	
	
	@GetMapping("/jobPost/{postId}")
	public JobPost getJob(@PathVariable long postId) {
		return service.getJob(postId);
	}
	
	
	@GetMapping("jobPosts/keyword/{keyword}")
	public List<JobPost> searchByKeyword(@PathVariable("keyword") String keyword){
		return service.search(keyword);
		
	}
	
	
	

	@PostMapping("jobPost")
	public JobPost addJob(@RequestBody JobPost jobPost) {
		service.addJob(jobPost);
		return service.getJob(jobPost.getPostId());
	}
	
	
	
	@PutMapping("jobPost")
	public JobPost updateJob(@RequestBody JobPost jobPost) {
		service.updateJob(jobPost);
		return service.getJob(jobPost.getPostId());
	}
	
	
	
	
	@DeleteMapping("jobPost/{postId}")
	public String deleteJob(@PathVariable long postId)
	{
		service.deleteJob(postId);
		return "Deleted";
	}
	
	
	@GetMapping("load")
	public String loadData() {
		service.load();
		return "success";
	}


}
