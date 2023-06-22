package com.example.evetrac_API.repository;

import com.example.evetrac_API.model.PasswordResetToken;
import com.example.evetrac_API.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface passwordTokenRepository extends JpaRepository<PasswordResetToken, Long> {

}
