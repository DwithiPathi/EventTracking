package com.example.evetrac_API.repository;

import com.example.evetrac_API.model.Event;
import com.example.evetrac_API.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByEmail(String email);
    List<User> findByCreatedEvents(Long eventId);

    ArrayList<Long> findEventIdsByUserId(@Param("userId") Long userId);

    User findByUserId(long Id);
}