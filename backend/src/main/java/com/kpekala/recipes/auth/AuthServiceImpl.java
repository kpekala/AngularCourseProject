package com.kpekala.recipes.auth;

import com.kpekala.recipes.auth.exception.UserExistsException;
import com.kpekala.recipes.auth.user.UserEntity;
import com.kpekala.recipes.auth.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{

    private final UserRepository userRepository;

    @Override
    public void signUp(String email, String password) {
        List<UserEntity> usersWithSameEmail =  userRepository.findByEmail(email);
        if (!usersWithSameEmail.isEmpty())
            throw new UserExistsException("User with this email exists!");
        userRepository.save(new UserEntity(email, password));
    }
}
