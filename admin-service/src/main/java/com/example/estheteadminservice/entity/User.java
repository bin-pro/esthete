package com.example.estheteadminservice.entity;

import com.example.estheteadminservice.vo.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.UUID;

@Entity
@Table(name = "users")
@NoArgsConstructor
@Getter
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(name = "user_name", unique = true)
    private String username;

    @Column(name = "user_password", unique = true)
    private String password;

    @Column(name = "user_role")
    private Role role;

    @Builder(builderMethodName = "createAdmin")
    public User(String username, String password) {
        this.username = username;
        this.password = password;
        this.role = Role.ADMIN;
    }

    @PostPersist
    public void postPersist() {
        if (this.username == null) {
            this.username = "manager" + this.id;
        }
        if (this.password == null) {
            this.password = UUID.randomUUID().toString();
        }
        if (this.role == null) {
            this.role = Role.MANAGER;
        }
    }
}
