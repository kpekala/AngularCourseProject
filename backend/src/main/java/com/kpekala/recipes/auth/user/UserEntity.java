package com.kpekala.recipes.auth.user;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "USERS")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String password;

    public UserEntity(String email, String password){
        this.email = email;
        this.password = password;
    }
}
