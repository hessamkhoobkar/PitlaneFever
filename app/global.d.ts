import { Database as Supabase } from "@/types/supabase";

declare global {
  type Database = Supabase;
}
