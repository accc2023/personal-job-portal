package com.arhan.springbootrest.model;


import java.util.List;


import jakarta.persistence.Column;
import org.springframework.stereotype.Component;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class JobPost {

	@Id
	private long postId;
	private String postProfile;
	@Column(length = 1000)
	private String postDesc;
	private Integer reqExperience;
	private List<String> postTechStack;
	private String company;
	private String location;
	private String redirectUrl;
	private String postDate;
	@Column(nullable = false)
	private double salaryMax = 0.0;
	@Column(nullable = false)
	private double salary = 0.0; //Minimum salary!
////	@Column(nullable = false)
//	private String salaryMin;
	

}
