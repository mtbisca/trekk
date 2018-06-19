package br.com.firma.trekk.controller;

import br.com.firma.trekk.model.Usuario;
import br.com.firma.trekk.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usucontroller")
@CrossOrigin(origins = {"*"} )
public class UsuarioController {
    @Autowired //Dependecy injection
    private UsuarioRepository usuarioRepository;

    @PostMapping ("/inserir")
    public Usuario inserir(@RequestBody Usuario usuario){
        return usuarioRepository.save(usuario);
    }
    @GetMapping ("/getusers")
    public List<Usuario> getUsuarios(){
        return usuarioRepository.findAll();
    }

}
