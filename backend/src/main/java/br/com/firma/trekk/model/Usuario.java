package br.com.firma.trekk.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

@Entity
@Data
public class Usuario {
    @Id
    @GeneratedValue(generator = "seq_usuario")
    @SequenceGenerator(name="seq_usuario", sequenceName = "seq_usuario")
    private Integer id;
    private String nome;
    private String senha;
}
