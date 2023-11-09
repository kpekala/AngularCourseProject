package com.kpekala.recipes.auth;

import com.kpekala.recipes.auth.exception.UserDoesNotExistException;
import com.kpekala.recipes.auth.exception.UserExistsException;
import com.kpekala.recipes.auth.rest.LoginResponse;
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
        List<UserEntity> usersWithTheSameEmail = userRepository.findByEmail(email);
        if (!usersWithTheSameEmail.isEmpty())
            throw new UserExistsException();
        userRepository.save(new UserEntity(email, password));

        Date tokenExpirationDate = Date.from(Instant.now().plusSeconds(3600L));
        String token = JwtGenerator.generateJwt(tokenExpirationDate, email);
        return new SignUpResponse(token, tokenExpirationDate.toString());
    }

    @Override
    @Transactional
    public LoginResponse login(String email, String password) {
        List<UserEntity> usersWithTheSameEmail = userRepository.findByEmail(email);
        if (usersWithTheSameEmail.isEmpty())
            throw new UserDoesNotExistException();

        Date tokenExpirationDate = Date.from(Instant.now().plusSeconds(3600L));
        String token = JwtGenerator.generateJwt(tokenExpirationDate, email);

        return new LoginResponse(token, tokenExpirationDate.toString());
    }
}
