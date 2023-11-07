package com.kpekala.recipes.auth.user;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String email;
    private String password;

    public UserEntity(){

    }

    public UserEntity(String email, String password){
        this.email = email;
        this.password = password;
    }
}
