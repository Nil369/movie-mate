import { Client, ID, Query, TablesDB } from "react-native-appwrite"; // 1. Changed Databases to TablesDB

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);


const movieDB = new TablesDB(client);

// Test function to verify Appwrite connection
export const testAppwriteConnection = async () => {
  try {
    console.log("Testing Appwrite connection...");
    
    // Try to list existing rows to test connection
    const result = await movieDB.listRows({
      databaseId: DATABASE_ID,
      tableId: COLLECTION_ID,
      queries: [Query.limit(1)],
    });
    
    console.log("Connection test successful. Existing rows:", result.rows.length);
    return true;
  } catch (error) {
    console.error("Connection test failed:", error);
    return false;
  }
};


export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await movieDB.listRows({
      databaseId: DATABASE_ID,
      tableId: COLLECTION_ID,
      queries: [
        Query.equal("searchTerm", query),
      ],
    });

    if (result.rows.length > 0) {
      const existingMovie = result.rows[0];

      await movieDB.updateRow({
        databaseId: DATABASE_ID,
        tableId: COLLECTION_ID,
        rowId: existingMovie.$id,
        data: {
          count: existingMovie.count + 1,
        },
      });

    } else {
      await movieDB.createRow({
        databaseId: DATABASE_ID,
        tableId: COLLECTION_ID,
        rowId: ID.unique(), 
        data: {
          searchTerm: query,
          movie_id: movie.id,
          title: movie.title,
          count: 1,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        },
      });
    }
  } catch (error) {
    console.error("Error updating search count:", error);
    throw error;
  }
};



export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    // 7. Using movieDB.listRows
    const result = await movieDB.listRows({
      databaseId: DATABASE_ID,
      tableId: COLLECTION_ID,
      queries: [
        Query.limit(5),
        Query.orderDesc("count"),
      ],
    });

    // 8. Documents property is now 'rows'
    return result.rows as unknown as TrendingMovie[];
  } catch (error) {
    console.error(error);
    return undefined;
  }
};