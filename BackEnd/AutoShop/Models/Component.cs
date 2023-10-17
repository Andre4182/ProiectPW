using SQLite;
namespace AutoShop.Models
{
    public class Component
    {           
        [PrimaryKey]
        [NotNull]
        [AutoIncrement]
        public int IdComponent { get; set; }

        //[NotNull]
        public string Name { get; set; }
        
        //[NotNull]
        public double Price { get; set; }
        
        //[NotNull]
        public int Stock{ get; set; }

    }
}
