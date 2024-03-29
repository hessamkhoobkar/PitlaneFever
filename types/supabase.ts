export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      likes: {
        Row: {
          created_at: string
          id: string
        }
        Insert: {
          created_at?: string
          id?: string
        }
        Update: {
          created_at?: string
          id?: string
        }
        Relationships: []
      }
      posts: {
        Row: {
          author_id: string
          created_at: string
          id: string
          post: string
        }
        Insert: {
          author_id: string
          created_at?: string
          id?: string
          post: string
        }
        Update: {
          author_id?: string
          created_at?: string
          id?: string
          post?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string
          cover_url: string
          created_at: string
          description: string
          id: string
          name: string
          user_connect: string | null
          username: string
        }
        Insert: {
          avatar_url: string
          cover_url: string
          created_at?: string
          description: string
          id?: string
          name: string
          user_connect?: string | null
          username: string
        }
        Update: {
          avatar_url?: string
          cover_url?: string
          created_at?: string
          description?: string
          id?: string
          name?: string
          user_connect?: string | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_user_connect_fkey"
            columns: ["user_connect"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      reply: {
        Row: {
          created_at: string
          id: string
          text: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          text?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          text?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
