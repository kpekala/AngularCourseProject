package com.kpekala.recipes.utils;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.util.Date;

public class JwtGenerator {
    public static String generateJwt(Date expirationDate, String claimName){
        SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode("TODOTODOTODOTODOTODOTODOTODOTODOTODOTODOTODOTODO"));
        return Jwts.builder()
                .subject(claimName)
                .expiration(expirationDate)
                .signWith(key)
                .compact();
    }
}
