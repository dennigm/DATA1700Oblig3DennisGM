package oslomet.data1700oblig3dennis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class KundeRepository {

    @Autowired
    private JdbcTemplate db;

    public void lagreKunde(Billett innKunde){
        String sql = "INSERT INTO Billett (film, antall, fornavn, etternavn, tlf, epost) VALUES(?,?,?,?,?,?)";
        db.update(sql,innKunde.getFilm(),innKunde.getAntall(),innKunde.getFornavn(),innKunde.getEtternavn(),innKunde.getTlf(),innKunde.getEpost());
    }

    public List<Billett> utBillett(){
        String sql ="SELECT * FROM Billett";
        List<Billett> hentBillett = db.query(sql,new BeanPropertyRowMapper(Billett.class));
        return hentBillett;
    }

    public void slettAlleKunder(){
        String sql ="DELETE FROM Billett";
        db.update(sql);
    }
}
