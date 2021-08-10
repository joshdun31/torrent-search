const express=require('express')
const app=express()
const PORT=process.env.PORT || 5000
const TorrentSearchApi=require('torrent-search-api')

TorrentSearchApi.enablePublicProviders()

const providers=['1337x','Eztv','KickassTorrents','Limetorrents','Rarbg','ThePirateBay','TorrentProject','Torrentz2','Yts']

app.get('/api/v2/torrent/movie/:query',async(req,res,next)=>{
    try {
        let result=await TorrentSearchApi.search(providers,req.params.query,'Movies',500)
        res.json({"result":result,total_results:result.length})
    } catch (error) {
        next(error)
    }
})

app.get('/api/v2/torrent/tv/:query',async(req,res,next)=>{
    try {
        let result=await TorrentSearchApi.search(providers,req.params.query,'TV',500)
        res.json({"result":result,total_results:result.length})
    } catch (error) {
        next(error)
    }
})

app.get('/api/v2/torrent/all/:query',async(req,res,next)=>{
    try {
        let result=await TorrentSearchApi.search(providers,req.params.query,'All',500)
        res.json({"result":result,total_results:result.length})
    } catch (error) {
        next(error)
    }
})

app.use((error,req,res,next)=>{
    res.json({message:error.message})
})

app.listen(PORT,()=>{
    console.log(`Server is running in ${PORT} port`);
})