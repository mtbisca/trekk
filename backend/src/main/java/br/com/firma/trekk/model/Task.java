package br.com.firma.trekk.model;

import lombok.Data;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import java.util.ArrayList;

@Entity
@Data
@CrossOrigin(origins = {"http://127.0.0.1:8080/"})
public class Task {
    @Id
    @GeneratedValue(generator = "seq_task")
    @SequenceGenerator(name="seq_task", sequenceName = "seq_task")
    private Integer id;
    private String title;
    private String description;
    private String deadline;
    private Integer progress;
    private ArrayList<String> progressClasses;
    private ArrayList<Integer> dependencies;
    private Integer members;
    private ArrayList<String> checklistItems;
    private ArrayList<String> checkedItems;
    private Boolean isExpanded;
}
