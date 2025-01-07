package com.arhan.springbootrest.service;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.arhan.springbootrest.model.JobPost;
import com.arhan.springbootrest.repo.JobRepo;

import org.springframework.web.client.RestTemplate;

import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;

// Jackson for JSON parsing (ObjectMapper, GetValue methods)
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;





@Service
public class JobService {

	@Autowired
	public JobRepo repo;

	//API CODE BELOW
	//https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=5bf1a997&app_key=f74d4be22163898730057fbbcb98e0f7&results_per_page=10&what=java&where=cupertino&salary_min=10000&company=apple

	private static final String ADZUNA_API_URL =
			"https://api.adzuna.com/v1/api/jobs/{country}/search/1?app_id={appId}&app_key={appKey}&results_per_page={resultsPerPage}&what={what}&where={where}&salary_min={salary}&company={company}&content-type=application/json";

	private static final String ADZUNA_API_URL_WITHOUT_WHERE =
			"https://api.adzuna.com/v1/api/jobs/{country}/search/1?app_id={appId}&app_key={appKey}&results_per_page={resultsPerPage}&what={what}&salary_min={salary}&company={company}&content-type=application/json";

	private static final String ADZUNA_API_URL_WITHOUT_COMPANY =
			"https://api.adzuna.com/v1/api/jobs/{country}/search/1?app_id={appId}&app_key={appKey}&results_per_page={resultsPerPage}&what={what}&where={where}&salary_min={salary}&content-type=application/json";

	private static final String ADZUNA_API_URL_WITHOUT_WHERE_COMPANY =
			"https://api.adzuna.com/v1/api/jobs/{country}/search/1?app_id={appId}&app_key={appKey}&results_per_page={resultsPerPage}&what={what}&salary_min={salary}&content-type=application/json";
	// Change such that there are multiple API URL
	// Method to fetch jobs from Adzuna API
	public List<JobPost> importJobsFromAdzuna(String what, String country, String where, Integer salary_min, String company, String appId, String appKey, int resultsPerPage) {
		List<JobPost> finalJobPosts = new ArrayList<>();
		RestTemplate restTemplate = new RestTemplate();

		//if (!where.isEmpty()) {
		//}


		try {
			// Use ResponseEntity to inspect the response
			ResponseEntity<String> responseEntity;

			if(!where.isEmpty() && !company.isEmpty()) {
				responseEntity = restTemplate.getForEntity(
						ADZUNA_API_URL,
						String.class,
						country, appId, appKey, resultsPerPage, what, where, salary_min, company
				);
			} else if(where.isEmpty() && !company.isEmpty()) {
				//EX: http://localhost:8080/importJobs?country=us&what=java&resultsPerPage=10&salary_min=250000&company=Google&content-type=application/json
				responseEntity = restTemplate.getForEntity(
						ADZUNA_API_URL_WITHOUT_WHERE,
						String.class,
						country, appId, appKey, resultsPerPage, what, salary_min, company
				);
			} else if(!where.isEmpty() && company.isEmpty()) {
				//EX: http://localhost:8080/importJobs?country=us&what=java&resultsPerPage=10&where=charleston&salary_min=250000&content-type=application/json
				responseEntity = restTemplate.getForEntity(
						ADZUNA_API_URL_WITHOUT_COMPANY,
						String.class,
						country, appId, appKey, resultsPerPage, what, where, salary_min
				);
			} else {
				responseEntity = restTemplate.getForEntity(
						ADZUNA_API_URL_WITHOUT_WHERE_COMPANY,
						String.class,
						country, appId, appKey, resultsPerPage, what, salary_min
				);
			}

			// Log response for debugging
			System.out.println("Response Status Code: " + responseEntity.getStatusCode());
			System.out.println("Response Body: " + responseEntity.getBody());

			// Check if the response content type is JSON
			MediaType contentType = responseEntity.getHeaders().getContentType();
			if (contentType != null && contentType.equals(MediaType.APPLICATION_JSON_UTF8)) {
				// Parse JSON response into a Map
				ObjectMapper objectMapper = new ObjectMapper();
				Map<String, Object> response = objectMapper.readValue(responseEntity.getBody(), Map.class);

				// Process the results
				List<Map<String, Object>> results = (List<Map<String, Object>>) response.get("results");
				List<JobPost> jobPosts = new ArrayList<>();

				for (Map<String, Object> result : results) {
					JobPost jobPost = new JobPost();
					jobPost.setPostProfile((String) result.get("title"));
					jobPost.setPostDesc((String) result.get("description"));
					jobPost.setCompany((String) ((Map<String, Object>) result.get("company")).get("display_name"));
					jobPost.setLocation((String) ((Map<String, Object>) result.get("location")).get("display_name"));

					// Ensure unique identifier

					if (result.get("id") instanceof String) {
						Long externalId = Long.parseLong((String) result.get("id"));
						jobPost.setPostId(externalId != null ? externalId : 0); // Use external ID if available
					} else if (result.get("id") instanceof Integer) {
						Long externalId = (Long) result.get("id");
						jobPost.setPostId(externalId != null ? externalId : 0); // Use external ID if available
					}

					if (result.get("salary_min") instanceof Integer) {
						jobPost.setSalary(((Integer) result.get("salary_min")).doubleValue());
					} else if (result.get("salary_min") instanceof Double) {
						jobPost.setSalary((Double) result.get("salary_min"));
					} else if(result.get("salary_min") instanceof String) {
						jobPost.setSalary(Double.parseDouble((String) result.get("salary_min")));
					} else if(result.get("salary_min") instanceof Float) {
						jobPost.setSalary((Float) result.get("salary_min"));
					} else {
						jobPost.setSalary(0);
						//throw new IllegalArgumentException("Unexpected salary data type");
					}
					//jobPost.setSalary((Integer) result.get("salary_min"));

					if (result.get("salary_max") instanceof Integer) {
						jobPost.setSalaryMax(((Integer) result.get("salary_max")).doubleValue());
					} else if (result.get("salary_max") instanceof Double) {
						jobPost.setSalaryMax((Double) result.get("salary_max"));
					} else {
						jobPost.setSalaryMax(0.0); //temp in case they don't have
					}

					//jobPost.setSalaryMax((String) result.get("salary_max"));
					jobPost.setPostDate((String) result.get("created"));
					jobPost.setRedirectUrl((String) result.get("redirect_url"));

					jobPosts.add(jobPost);
				}

				// Save all jobs to the database
				//repo.saveAll(jobPosts);

				for (JobPost jobPost : jobPosts) {

					finalJobPosts.add(jobPost);

					if (jobPost.getPostId() != 0) { // Check if the entity has an ID
						Optional<JobPost> existingJobPost = repo.findById(jobPost.getPostId());
						if (existingJobPost.isPresent()) {
							// Update the existing entity
							//repo.save(jobPost);
						} else {
							// Save as a new entity
							//repo.save(jobPost);
						}
					} else {
						// Save as a new entity (ID is null)
						//repo.save(jobPost);
					}
				}


			} else {
				// Handle non-JSON response
				System.err.println("Unexpected content type: " + contentType);
			}
		} catch (HttpClientErrorException | HttpServerErrorException e) {
			// Handle HTTP error responses
			System.err.println("HTTP Error: " + e.getStatusCode() + " - " + e.getResponseBodyAsString());
		} catch (Exception e) {
			// Handle other exceptions
			e.printStackTrace();
		}

		return finalJobPosts;

	}

	//API CODE ABOVE
	
	
		
		
		
		// Method to return all JobPosts
		public List<JobPost> getAllJobs() {
			return repo.findAll();
			
		}
		
		
		
		


		
		
		
		// Method to add a jobPost (IMPLEMENTATION NEEDED)
		public void addJob(JobPost jobPost) {
			 repo.save(jobPost);
		
		}




		// Method to get job by ID (IMPLEMENTATION ALREADY?)
		public JobPost getJob(long postId) {
			
			return repo.findById(postId).orElse(new JobPost());
		}




		// Method to update job with job post object (NOT NEEDED AT THE MOMENT)
		public void updateJob(JobPost jobPost) {
		repo.save(jobPost);
			
		}




		// Method to delete job post by id (IMPLEMENTATION NEEDED)
		public void deleteJob(long postId) {
			repo.deleteById(postId);
			
		}









		public void load() {
			// arrayList to store store JobPost objects
			List<JobPost> jobs = 
					new ArrayList<>(List.of(
							new JobPost(1, "Software Engineer", "Exciting opportunity for a skilled software engineer.", 3, List.of("Java", "Spring", "SQL","API"),"","","","",0,0),
							new JobPost(2, "Data Scientist", "Join our data science team and work on cutting-edge projects.", 5, List.of("Python", "Machine Learning", "TensorFlow","API"),"","","","",0,0),
							 new JobPost(3, "Frontend Developer", "Create API amazing user interfaces with our talented frontend team.", 2, List.of("JavaScript", "React", "CSS","API"),"","","","",0, 0),
							 new JobPost(4, "Network Engineer", "Design and API maintain our robust network infrastructure.", 4, List.of("Cisco", "Routing", "Firewalls"),"","","","",0,0),
							 new JobPost(5, "UX Designer", "Shape the user experience with your creative design skills.", 3, List.of("UI/UX Design", "Adobe XD", "Prototyping"),"","","","",0,0)

					));
		
			repo.saveAll(jobs);
			
		}









		public List<JobPost> search(String keyword) {
		
			return repo.findByPostProfileContainingOrPostDescContaining(keyword,keyword);
		}


	public List<JobPost> searchCurrentJobs(String keyword) {
		// Use regex to split the search input into individual strings by spaces
		// Attaches '%'to prefix and suffix of each word to allow for partial matching
		// Finally convers to list to return to repo layer
		String[] keywordsArray = keyword.split("\\s+");
		List<String> keywords = Arrays.stream(keywordsArray)
				.map(word -> "%" + word + "%") // Add wildcards for partial matching
				.toList();

		return repo.searchByKeywords(keywords);
	}
}
