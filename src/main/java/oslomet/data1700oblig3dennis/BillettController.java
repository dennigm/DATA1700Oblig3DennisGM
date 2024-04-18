package oslomet.data1700oblig3dennis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BillettController {

    @Autowired
    private KundeRepository rep;

    @PostMapping("/lagre")
    public void lagreKunde(Billett innKunde){
        rep.lagreKunde(innKunde);
    }

    @GetMapping("/hentAlle")
    public List<Billett> hentAlle(){
        return rep.utBillett();
    }

    @GetMapping("/slettAlle")
    public void slettAlle(){
        rep.slettAlleKunder();
    }
}

