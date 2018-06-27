package br.com.firma.trekk.controller;
import java.util.List;

import br.com.firma.trekk.model.Task;
import br.com.firma.trekk.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/taskcontroller")
@CrossOrigin(origins = {"*"} )
public class TaskController {
    @Autowired //Dependecy injection
    private TaskRepository taskRepository;

    @PostMapping("/inserir")
    public Task inserir(@RequestBody Task task){
        return taskRepository.save(task);
    }

    @GetMapping("/getAll")
    public List<Task> getAll(){
        return taskRepository.findAll();
    }

    @DeleteMapping("/remover")
    public void remover(@RequestBody Integer id){
        taskRepository.deleteById(id);
    }

}
