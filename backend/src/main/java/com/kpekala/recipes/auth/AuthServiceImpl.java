package com.kpekala.recipes.auth;

import com.kpekala.recipes.auth.exception.UserDoesNotExistException;
import com.kpekala.recipes.auth.exception.UserExistsException;
import com.kpekala.recipes.auth.exception.WrongPasswordException;
import com.kpekala.recipes.auth.exception.WrongTokenException;
import com.kpekala.recipes.auth.rest.LoginResponse;
import com.kpekala.recipes.auth.rest.SignUpResponse;
import com.kpekala.recipes.auth.user.UserEntity;
import com.kpekala.recipes.auth.user.UserRepository;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    @Value("${token-key}")
    private String tokenKey;

    @Override
    @Transactional
    public SignUpResponse signUp(String email, String password) {
        List<UserEntity> usersWithTheSameEmail = userRepository.findByEmail(email);
        if (!usersWithTheSameEmail.isEmpty())
            throw new UserExistsException();
        userRepository.save(new UserEntity(email, password));

        Date tokenExpirationDate = Date.from(Instant.now().plusSeconds(3600L));
        String token = generateJwt(tokenExpirationDate, email);
        return new SignUpResponse(token, tokenExpirationDate.toString());
    }

    @Override
    @Transactional
    public LoginResponse login(String email, String password) {
        List<UserEntity> usersWithTheSameEmail = userRepository.findByEmail(email);
        if (usersWithTheSameEmail.isEmpty())
            throw new UserDoesNotExistException();
        UserEntity userEntity = usersWithTheSameEmail.get(0);
        if (!userEntity.getPassword().equals(password))
            throw new WrongPasswordException();

        Date tokenExpirationDate = Date.from(Instant.now().plusSeconds(3600L));
        String token = generateJwt(tokenExpirationDate, email);

        return new LoginResponse(token, tokenExpirationDate.toString());
    }

    @Override
    public void validateToken(String token) {
        SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(tokenKey));
        try {
            Jwts.parser().verifyWith(key).build().parseSignedClaims(token);
        } catch (JwtException exception) {
            throw new WrongTokenException();
        }
    }

    public String generateJwt(Date expirationDate, String claimName){
        SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(tokenKey));
        return Jwts.builder()
                   .subject(claimName)
                   .expiration(expirationDate)
                   .signWith(key)
                   .compact();
    }
}
