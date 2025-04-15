package com.example.rock.paper.backend.controller;


import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Allows frontend to call this API
public class GameController {

    private static final List<String> CHOICES = Arrays.asList("rock", "paper", "scissors");

    @GetMapping("/play")
    public Map<String, String> playGame(@RequestParam String userChoice) {
        Map<String, String> response = new HashMap<>();

        if (!CHOICES.contains(userChoice.toLowerCase())) {
            response.put("error", "Invalid choice");
            return response;
        }

        String computerChoice = CHOICES.get(new Random().nextInt(3));
        String result = determineWinner(userChoice.toLowerCase(), computerChoice);

        response.put("userChoice", userChoice);
        response.put("computerChoice", computerChoice);
        response.put("result", result);
        return response;
    }

    private String determineWinner(String user, String computer) {
        if (user.equals(computer)) return "It's a tie!";
        if ((user.equals("rock") && computer.equals("scissors")) ||
            (user.equals("paper") && computer.equals("rock")) ||
            (user.equals("scissors") && computer.equals("paper"))) {
            return "You win!";
        } else {
            return "Computer wins!";
        }
    }
}

