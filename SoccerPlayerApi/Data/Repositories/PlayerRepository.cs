using SoccerPlayerApi.Data.Interfaces;

namespace SoccerPlayerApi.Data.Repositories
{
    public class PlayerRepository : IPlayerRepository
    {
        public readonly SampleDatabaseContext _databaseContext;

        public PlayerRepository(SampleDatabaseContext dbContext)
        {
            _databaseContext = dbContext;
        }
        
        public async Task<int> CreatePlayer(Player player)
        {
            _databaseContext.Players.Add(player);
            await _databaseContext.SaveChangesAsync();
            return player.PlayerId;
        }

        public async Task<bool> DeletePlayer(int playerId)
        {
            var player = await _databaseContext.Players.Where(p => p.PlayerId == playerId).FirstOrDefaultAsync();
            _databaseContext.Players.Remove(player);
            await _databaseContext.SaveChangesAsync();
            return true;
        }

        public async Task<int> EditPlayer(Player player)
        {
            var playerToEdit = await _databaseContext.Players.Where(p => p.PlayerId == player.PlayerId).FirstOrDefaultAsync();
            playerToEdit.Name = player.Name;
            playerToEdit.JerseyNumber = player.JerseyNumber;
            await _databaseContext.SaveChangesAsync();
            return player.PlayerId;
        }

        public async Task<List<Player>> GetPlayers()
        {
            var result = await _databaseContext.Players.ToListAsync();
            return result;
        }
    }
}