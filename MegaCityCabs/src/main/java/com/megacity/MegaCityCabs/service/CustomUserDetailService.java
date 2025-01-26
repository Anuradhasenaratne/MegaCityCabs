package com.megacity.MegaCityCabs.service;

import com.megacity.MegaCityCabs.entity.User;
import com.megacity.MegaCityCabs.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.User.UserBuilder;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailService implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public CustomUserDetailService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Find the user by username (in this case, email)
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        // Return a UserDetails implementation using User object
        UserBuilder userBuilder = org.springframework.security.core.userdetails.User.withUsername(user.getEmail());
        userBuilder.password(user.getPassword());
        userBuilder.authorities(user.getAuthorities());

        return userBuilder.build();
    }
}
