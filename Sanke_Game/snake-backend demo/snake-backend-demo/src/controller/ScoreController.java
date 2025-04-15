package com.snakegame.controller;

import com.snakegame.model.Score;
import com.snakegame.repository.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/scores")
@CrossOrigin(origins = "*")
public class ScoreController {

    @Autowired
    private ScoreRepository scoreRepository;

    @PostMapping
    public Score saveScore(@RequestBody Score score) {
        return scoreRepository.save(score);
    }

    @GetMapping
    public List<Score> getAllScores() {
        return scoreRepository.findAll();
    }
}
