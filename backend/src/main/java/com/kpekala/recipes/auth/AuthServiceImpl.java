package com.kpekala.recipes.auth;

import com.kpekala.recipes.auth.exception.UserExistsException;
import com.kpekala.recipes.auth.rest.SignUpResponse;
import com.kpekala.recipes.auth.user.UserEntity;
import com.kpekala.recipes.auth.user.UserRepository;
import com.kpekala.recipes.utils.JwtGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{

    private final UserRepository userRepository;

    @Override
    @Transactional
    public SignUpResponse signUp(String email, String password) {
        List<UserEntity> usersWithSameEmail = userRepository.findByEmail(email);
        if (!usersWithSameEmail.isEmpty())
            throw new UserExistsException("User with this email exists!");
        userRepository.save(new UserEntity(email, password));

        Date expirationDate = Date.from(Instant.now().plusSeconds(3600L));
        String token = JwtGenerator.generateJwt(expirationDate, email);
        return new SignUpResponse(token, expirationDate.toString());
    }
}
