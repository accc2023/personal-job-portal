package com.arhan.springbootrest.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.arhan.springbootrest.model.User;


@Repository
public interface UserRepo extends JpaRepository<User, Integer> {

	User findByUsername(String username);
}
