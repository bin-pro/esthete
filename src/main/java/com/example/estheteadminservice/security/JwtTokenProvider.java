package com.example.estheteadminservice.security;

import com.example.estheteadminservice.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
public class JwtTokenProvider {

    @Value("${jwt.secret}")
    private String SECRET_KEY;

    // 토큰 생성
    public String create(User user) {
        Date now = new Date(); // 현재 시간
        Date accessTokenValidity = new Date(now.getTime() + 1000 * 60 * 60); // 60분 뒤 만료
        String accessToken = Jwts.builder()
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .setSubject(user.getUsername())
                .setIssuer("esthete admin")
                .setIssuedAt(now)
                .setExpiration(accessTokenValidity)
                .compact();

        return accessToken;
    }

    public String validateAndGetUsername(String token) throws Exception {
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();

        Date expirationDate = claims.getExpiration();
        Date currentDate = new Date();

        if (expirationDate.before(currentDate)) {
            throw new ExpiredJwtException(null, null, "Token has expired");
        }

        return claims.getSubject();
    }
}
