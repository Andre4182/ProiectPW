using AutoShop.Models;
using SQLite;

namespace AutoShop.Repositories
{
    public static class CarRepository
    {
        private static SQLiteAsyncConnection database;
        
        static CarRepository()
        {    
            var applicationPath = Path.GetDirectoryName(typeof(CarRepository).Assembly.Location);
            var databasePath = Path.Combine(applicationPath, "AutoShopDataBase.db");
            database = new SQLiteAsyncConnection(databasePath);
            database.CreateTableAsync<Car>().Wait();
        }

        public static async Task<List<Car>> GetAll()
        {
            return await database.Table<Car>().ToListAsync();
        }

        public static async Task<Car> GetCar(int id)
        {
            // return await database.Table<Car>().FirstOrDefaultAsync(car => car.IdCar == id);
            //return await database.FindAsync<Car>(id);
            return await database.GetAsync<Car>(id); // merge doar pe cheie primara
        }

        public static async Task<Car> AddCar(Car car)
        {
            await database.InsertAsync(car);
            return car;
        }

        public static async Task<Car> UpdateCar(int id,Car updatedCar)
        {
            Car existingCar = await GetCar(id);
            existingCar.Brand = updatedCar.Brand;
            existingCar.Model = updatedCar.Model;
            existingCar.ProductionYear = updatedCar.ProductionYear;
            existingCar.Stock = updatedCar.Stock;

            await database.UpdateAsync(existingCar);
            return existingCar;
            
        }

        public static async Task<Car> DeleteCar(int id)
        {
            Car wantedCar = await GetCar(id);
            await database.Table<Car>().DeleteAsync(car => car.IdCar == id);
            return wantedCar;          
        }
    }
}
