//get the team name and return its full name, so that city names can change
export const fullTeamName=(name)=>{
    switch (name.split("-")[0]){
        case "frostbite":
            return "Burlington Frostbite"
        case "wizards":
            return "Waterloo Wizards"
        case "warhawks":
            return "Hamilton Warhawks"
        case "tempo":
            return "Toronto Tempo"
        case "mischief":
            return "Mississauga Mischief"
        case "hydra":
            return "Niagara Hydra"
        case "eclipse":
            return "Cambridge Eclipse"
        case "honor":
            return "Ottawa Honor"
        case "JClarkeRichardson":
            return "J. ClarkeRichardson-" + name.split("-")[1]
        case "MarkvilleSS":
            return "Markville S.S.-" + name.split("-")[1]
        case "RegNotreDame":
            return "Reg. Notre Dame-" + name.split("-")[1]
        case "SirWinstonChurchill":
            return "Sir Winston Churchill-"+ name.split("-")[1]
        case "SuttonDistrict":
                return "Sutton District-" + name.split("-")[1]
        case "WaterlooOxford":
                return "Waterloo Oxford-" + name.split("-")[1]
        default:
            return name;
    }
}

export const shortFormTeamName=(name)=>{
    switch (name.split("-")[0]){
        case "frostbite":
            return "BF"
        case "wizards":
            return "WW"
        case "warhawks":
            return "HW"
        case "tempo":
            return "TT"
        case "mischief":
            return "MM"
        case "hydra":
            return "NH"
        case "eclipse":
            return "CE"
        case "honor":
            return "OH"
        case "JClarkeRichardson":
            return "JCR-"+ name.split("-")[1]
        case "MarkvilleSS":
            return "MKV-"+ name.split("-")[1]
        case "RegNotreDame":
            return "RND-"+ name.split("-")[1]
        case "SirWinstonChurchill":
            return "SWC-"+ name.split("-")[1]
        case "SuttonDistrict":
                return "SUD-"+ name.split("-")[1]
        case "WaterlooOxford":
                return "WLO-"+ name.split("-")[1]
        default:
            return name ? (name.substr(0, 3)):(null);
    }
}

export const getTeamOrg=(name)=>{
    switch (name.split("-")[0]){
        case "JClarkeRichardson":
            return "tempo_academy"
        case "MarkvilleSS":
            return "mischief_academy"
        case "RegNotreDame":
            return "honor_academy"
        case "SirWinstonChurchill":
            return "hydra_academy"
        case "SuttonDistrict":
                return "tempo_academy"
        case "WaterlooOxford":
                return "wizards_academy"
        default:
            return null
    }
}