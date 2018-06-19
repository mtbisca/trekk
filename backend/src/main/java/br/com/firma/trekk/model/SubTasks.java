package br.com.firma.trekk.model;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import java.util.List;

@Entity
@Data
public class SubTasks {
    @Id
    @GeneratedValue(generator = "seq_subtask")
    @SequenceGenerator(name="seq_subtask", sequenceName = "seq_subtask")
    private Integer id;
    private String title;
    private String description;
}
