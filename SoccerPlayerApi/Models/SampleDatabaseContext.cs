using Microsoft.EntityFrameworkCore;

namespace SoccerPlayerApi.Models
{
    public partial class SampleDatabaseContext : DbContext
    {
        public SampleDatabaseContext(DbContextOptions<SampleDatabaseContext> options)
            : base(options)
        {
        }

        public DbSet<Player> Players { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Player>(entity =>
            {
                entity.HasKey(e => e.PlayerId);

                entity.Property(e => e.PlayerId)
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Name)
                    .HasMaxLength(100);

                entity.Property(e => e.JerseyNumber);
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
