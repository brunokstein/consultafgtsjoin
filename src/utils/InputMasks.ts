type FormDataProps = {
    cpf: string;
}

export function maskPhone(value: string) {
    if(value) {
        value = value.replace(/\D/g, "");
        value = value.replace(/^(\d{2})(\d)/g, "($1)$2");
        value = value.replace(/(\d)(\d{4})$/, "$1-$2");
        return value;
    }
}

export function maskCPF(value: string) {
    if(value) {
        return value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1")
    }
}

export function removeCpfMask(value: FormDataProps) {
    return value.cpf 
    .replace(/\D/g, '')
}

export function maskCoin(value: number) {
    let tmp = String(value);
    if(tmp.indexOf("-") == 0)
        {
            tmp = tmp.replace("-","");
        }
        if(tmp.length == 1) tmp = "0"+tmp
        tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
        if( tmp.length > 6)
            tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");

        if( tmp.length > 9)
            tmp = tmp.replace(/([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g,".$1.$2,$3");

        if( tmp.length > 12)
            tmp = tmp.replace(/([0-9]{3}).([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g,".$1.$2.$3,$4");

        if(tmp.indexOf(".") == 0) tmp = tmp.replace(".","");
        if(tmp.indexOf(",") == 0) tmp = tmp.replace(",","0,");

        return tmp;
}

/* const maskDate = value => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d)/, "$1")
  }

  const maskCEP = value => {
    return value.replace(/\D/g, "").replace(/^(\d{5})(\d{3})+?$/, "$1-$2")
  }
 */