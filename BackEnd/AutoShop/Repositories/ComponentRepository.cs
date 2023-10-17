using SQLite;
using AutoShop.Models;

namespace AutoShop.Repositories
{
    public static class ComponentRepository
    {
        private static SQLiteAsyncConnection database;

        static ComponentRepository()
        {
            var applicationPath = Path.GetDirectoryName(typeof(ComponentRepository).Assembly.Location);
            var databasePath = Path.Combine(applicationPath, "AutoShopDataBase.db");
            database = new SQLiteAsyncConnection(databasePath);
            database.CreateTableAsync<Component>().Wait();
        }
        public static async Task<List<Component>> GetAll()
        {
            return await database.Table<Component>().ToListAsync();
        }

        public static async Task<Component> GetComponent(int id)
        {
            // return await database.Table<Component>().FirstOrDefaultAsync(comp => comp.IdComponent == id);
            //return await database.FindAsync<Component>(id);
            return await database.GetAsync<Component>(id); // merge doar pe cheie primara
        }

        public static async Task<Component> AddComponent(Component component)
        {
            await database.InsertAsync(component);
            return component;
        }

        public static async Task<Component> UpdateComponent(int id, Component updatedComponent)
        {
            Component existingComponent = await GetComponent(id);
            existingComponent.Name = updatedComponent.Name;
            existingComponent.Price = updatedComponent.Price;
            existingComponent.Stock = updatedComponent.Stock;

            await database.UpdateAsync(existingComponent);
            return existingComponent;

        }

        public static async Task<Component> DeleteComponent(int id)
        {
            Component wantedComponent = await GetComponent(id);
            await database.Table<Component>().DeleteAsync(comp => comp.IdComponent == id);
            return wantedComponent;
        }
    }
}
