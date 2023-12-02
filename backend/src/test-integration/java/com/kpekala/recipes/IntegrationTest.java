package com.kpekala.recipes;

import com.kpekala.recipes.auth.user.UserEntity;
import com.kpekala.recipes.auth.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class IntegrationTest {

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    public void setup() {
        userRepository.deleteAll();
        userRepository.save(new UserEntity("admin@admin.pl", "admin"));
    }
}
