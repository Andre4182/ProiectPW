using SQLite;

namespace AutoShop.Models
{
    public class Car
    {
        [PrimaryKey]
        [NotNull]
        [AutoIncrement]
        public int IdCar {get; set; }
       
        //[NotNull]
        public string Brand{ get; set; }
        
        //[NotNull]
        public string Model{ get; set; }
        
        //[NotNull]
        public int ProductionYear{ get; set; }

        //[NotNull] 
        public int Stock{ get; set; }

    }
}
