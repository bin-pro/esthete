package com.example.estheteadminservice.entity;

import com.example.estheteadminservice.vo.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.UUID;

@Entity
@Table(name = "users")
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
@Getter
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(columnDefinition = "BINARY(16)", name = "user_uuid", unique = true)
    private String userId;

    @Column(name = "user_password", unique = true)
    private String password;

    @Column(name = "user_role")
    private Role role;

    @PostPersist
    public void postPersist() {
        if (this.userId == null) {
            this.userId = "manager" + this.id;
        }
        if (this.password == null) {
            this.password = UUID.randomUUID().toString();
        }
        if (this.role == null) {
            this.role = Role.MANAGER;
        }
    }
}
