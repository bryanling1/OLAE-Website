const express = require("express")
const async = require("async")
const request = require("request")
const router = express.Router();
const championsClass = require("../class/champions")
const api_key = 'RGAPI-af5c83ef-3379-4298-8da5-66945d3cd59f';
const provider_url = 'https://americas.api.riotgames.com/lol/tournament-stub/v4/providers';
const tournament_url = 'https://americas.api.riotgames.com/lol/tournament-stub/v4/tournaments';
const match_url = 'https://na1.api.riotgames.com/lol/match/v4/matches/'
let match_id = '';
const provider_body_data = {"region": "NA","url": "http://olae.ca"};
let tournament_body_data = {"name": "olae2020", "providerId": null};
const provider_options = {
    method: 'post',
    url: provider_url,
    headers:{
        "Origin": "https://developer.riotgames.com",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "X-Riot-Token": api_key,
        "Accept-Language": "en-US,en;q=0.9",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
    },
    body:provider_body_data,
    json: true
}
const tournament_options = {
    method: 'post',
    url: tournament_url,
    headers:{
        "Origin": "https://developer.riotgames.com",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "X-Riot-Token": api_key,
        "Accept-Language": "en-US,en;q=0.9",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
    },
    body: tournament_body_data,
    json: true
}
let match_options = {
    method: 'GET',
    url: 'https://na1.api.riotgames.com/lol/match/v4/matches/',
    headers:{
        "Origin": "https://developer.riotgames.com",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "X-Riot-Token": api_key,
        "Accept-Language": "en-US,en;q=0.9",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
    },
    json: true
}

router.get("/genTourney", function(req, res, next){
    let return_json = {};
    
async.waterfall([
    //get provider id
    function(callback){
        request(provider_options, function(err, response, body){
        if(!err && response.statusCode == 200){
            return_json['providerId'] = body;
            callback(null, body)
        }else{
            console.log(response.statusCode);
        }
    })
    },
    //get tournament id
     function(provider, callback){
        tournament_body_data['providerId'] = provider;
        request(tournament_options, function(err, response, body){
            if(!err && response.statusCode == 200){
                return_json['tournamentId'] = body;
                callback(null, body)
                
            }else{
                console.log(response.statusCoder);
            }
        })

     }
], function(data, err){
    if(err){
        console.log(err);
    }
    else{
        res.json(return_json);
    }
    })

})

router.post("/matchResults", function(req, res, next){
    match_id = req.body.id;
    match_options['url'] = 'https://na1.api.riotgames.com/lol/match/v4/matches/'  + match_id;
    async.waterfall([
        function(callback){
            request(match_options, function(err, response, body){
                if(!err && response.statusCode == 200){
                    let return_data = [{},{},{},{},{},{},{},{},{},{}];
                    for(let x=0; x<10; x++){
                        return_data[x]['champion'] = championsClass.getChampionIdFromKey(body['participants'][x]['championId'])
                        return_data[x]['champion_key'] = body['participants'][x]['championId']
                        return_data[x]['kills'] = body['participants'][x]['stats']['kills']
                        return_data[x]['deaths'] = body['participants'][x]['stats']['deaths']
                        return_data[x]['assists'] = body['participants'][x]['stats']['assists']
                        return_data[x]['tripleKills'] = body['participants'][x]['stats']['tripleKills']
                        return_data[x]['quadraKills'] = body['participants'][x]['stats']['quadraKills']
                        return_data[x]['pentaKills'] = body['participants'][x]['stats']['pentaKills']
                        return_data[x]['win'] = body['participants'][x]['stats']['win']
                        return_data[x]['damage'] = body['participants'][x]['stats']['totalDamageDealtToChampions']
                        return_data[x]['gold'] = body['participants'][x]['stats']['goldEarned']
                        return_data[x]['visionScore'] = body['participants'][x]['stats']['visionScore']
                        return_data[x]['id'] = 0
                        return_data[x]['matchTime'] = body['gameDuration']

                    }
                    callback(return_data)
                }else{
                    console.log(response.statusCode);
                }
            })
        }
    ],function(data, err){
        if(err){
            console.log(err);
        }
        else{
            res.json(data);
        }
    });
})

module.exports = router;