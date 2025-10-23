using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using SoccerPlayerApi.Data.Interfaces;

namespace SoccerPlayerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayersController : ControllerBase
    {
        private readonly IPlayerRepository _playerRepository;

        public PlayersController(IPlayerRepository playerRepository)
        {
            _playerRepository = playerRepository;
        }

        [HttpGet("GetPlayers")]
        public async Task<IActionResult> GetPlayers()
        {
            var players = await _playerRepository.GetPlayers();
            return Ok(players);
        }

        [HttpPost("Post")]
        public async Task<IActionResult> Post([FromBody] Player player)
        {
            var players = await _playerRepository.CreatePlayer(player);
            return Ok(players);
        }
        
        [HttpPut("Put")]
        public async Task<IActionResult> Put([FromBody] Player player)
        {
            var players = await _playerRepository.EditPlayer(player);
            return Ok(players);
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var players = await _playerRepository.DeletePlayer(id);
            return Ok(players);
        }
    }
}
