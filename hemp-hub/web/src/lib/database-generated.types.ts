// This file is auto-generated. Do not edit manually.
// Run `npm run generate-types` to regenerate this file.

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
      categories: {
        Row: {
          id: string
          created_at: string
          name: string
          description: string
          image_url: string
          updated_at: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          description: string
          image_url: string
          updated_at?: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          description?: string
          image_url?: string
          updated_at?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string
          image_url: string
          category_id: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          description: string
          image_url: string
          category_id?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string
          image_url?: string
          category_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          }
        ]
      }
      hemp_parts: {
        Row: {
          id: string
          name: string
          description: string | null
          image_url: string | null
          info_url: string | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          image_url?: string | null
          info_url?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          image_url?: string | null
          info_url?: string | null
        }
        Relationships: []
      }
      hemp_products: {
        Row: {
          id: string
          hemp_part_id: string | null
          name: string
          description: string | null
          processing_methods: string | null
          image_url: string | null
          product_website_url: string | null
        }
        Insert: {
          id?: string
          hemp_part_id?: string | null
          name: string
          description?: string | null
          processing_methods?: string | null
          image_url?: string | null
          product_website_url?: string | null
        }
        Update: {
          id?: string
          hemp_part_id?: string | null
          name?: string
          description?: string | null
          processing_methods?: string | null
          image_url?: string | null
          product_website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_hemp_part_id_fkey"
            columns: ["hemp_part_id"]
            isOneToOne: false
            referencedRelation: "hemp_parts"
            referencedColumns: ["id"]
          }
        ]
      }
      hemp_uses: {
        Row: {
          id: string
          name: string
          description: string | null
          image_url: string | null
          application_info_url: string | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          image_url?: string | null
          application_info_url?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          image_url?: string | null
          application_info_url?: string | null
        }
        Relationships: []
      }
      product_applications: {
        Row: {
          product_id: string
          application_id: string
        }
        Insert: {
          product_id: string
          application_id: string
        }
        Update: {
          product_id?: string
          application_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_applications_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "hemp_products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_applications_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "hemp_uses"
            referencedColumns: ["id"]
          }
        ]
      }
      images: {
        Row: {
          id: string
          entity_type: string
          entity_id: string
          image_url: string
          caption: string | null
          alt_text: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          entity_type: string
          entity_id: string
          image_url: string
          caption?: string | null
          alt_text?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          entity_type?: string
          entity_id?: string
          image_url?: string
          caption?: string | null
          alt_text?: string | null
          created_at?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          id: string
          username: string
          email: string
          password_hash: string | null
          role: string | null
          profile_image_url: string | null
          website_url: string | null
        }
        Insert: {
          id?: string
          username: string
          email: string
          password_hash?: string | null
          role?: string | null
          profile_image_url?: string | null
          website_url?: string | null
        }
        Update: {
          id?: string
          username?: string
          email?: string
          password_hash?: string | null
          role?: string | null
          profile_image_url?: string | null
          website_url?: string | null
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