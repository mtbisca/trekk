package br.com.firma.trekk.repository;

import br.com.firma.trekk.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.cdi.JpaRepositoryExtension;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

}
