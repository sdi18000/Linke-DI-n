package com.project.linkedin.InterestDeclaration;


import com.project.linkedin.User.User;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Query;
import javax.websocket.server.PathParam;
import java.util.List;


@RestController
public class InterestDeclarationController {


    private final InterestDeclarationRepository repository;

    InterestDeclarationController(InterestDeclarationRepository repository) {
        this.repository = repository;
    }

    // Aggregate root

    @GetMapping("/interestdeclarations")
    List<InterestDeclaration> all() {
        return repository.findAll();
    }

    @PostMapping("/interestdeclarations")
    InterestDeclaration newInterestDeclaration(@RequestBody InterestDeclaration newInterestDeclaration) {
        return repository.save(newInterestDeclaration);
    }

    // Single item

    @GetMapping("/interestdeclarations/{id}")
    InterestDeclaration one(@PathVariable InterestDeclarationPK id) {

        return repository.findById(id).orElseThrow(() -> new InterestDeclarationNotFoundException(id));
    }

    @GetMapping("interestdeclarations/post-{id_post}")
    Long getLikeAmount(@PathVariable Long id_post){
        return repository.getPostLikes(id_post);
    }

    @GetMapping("interestdeclarations/users-{id_post}")
    List<User> getUsersFromLikes(@PathVariable Long id_post){
        return repository.getUsersWhoLiked(id_post);
    }


}
