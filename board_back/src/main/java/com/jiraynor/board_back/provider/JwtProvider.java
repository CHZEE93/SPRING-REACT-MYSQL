package com.jiraynor.board_back.provider;

import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtProvider {

    private Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    public String create(String email) {

        Date expireDate = Date.from(Instant.now().plus(1, ChronoUnit.HOURS));

        String jwt = Jwts.builder()
                .setSubject(email) // 토큰의 주체 (sub)
                .setIssuedAt(new Date()) // 발행 시간
                .setExpiration(expireDate) // 만료 시간
                .signWith(key) // 키와 알고리즘 설정
                .compact(); // 최종 토큰 생성

        return jwt;
    }

    public String validate(String jwt) {

        Claims claims = null;

        try {
            claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(jwt)
                    .getBody();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        return claims.getSubject();
    }

}
