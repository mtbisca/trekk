package br.com.firma.trekk.repository;

import br.com.firma.trekk.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Integer> {

}
