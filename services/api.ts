import { supabase } from './supabaseClient';
import { Appointment, ContactMessage } from '../types';

export const createAppointment = async (data: Appointment) => {
  try {
    const { id, ...insertData } = data;
    const { error } = await supabase
      .from('appointments')
      .insert([insertData]);

    if (error) {
      console.error("Supabase API Error:", JSON.stringify(error, null, 2));
      throw error;
    }

    return { success: true, message: "Appointment requested successfully" };
  } catch (error: any) {
    console.error("createAppointment Exception:", error);
    let msg = error.message || "Unknown error";
    
    if (msg.includes('row-level security')) {
        msg = "Unable to submit: The database security policy is blocking this request. Please ensure the 'Enable public insert' policy is active in Supabase SQL Editor.";
    }
    else if (msg.includes('valid URL') || msg.includes('Database not connected')) {
       msg = "System configuration error: Database not connected. Please check services/supabaseClient.ts";
    }

    throw new Error(msg);
  }
};

export const createContact = async (data: ContactMessage) => {
  try {
    const { id, ...insertData } = data;
    const { error } = await supabase
      .from('contacts')
      .insert([insertData]);

    if (error) {
      console.error("Supabase API Error:", JSON.stringify(error, null, 2));
      throw error;
    }

    return { success: true, message: "Message sent successfully" };
  } catch (error: any) {
    console.error("createContact Exception:", error);
    let msg = error.message || "Unknown error";

    if (msg.includes('row-level security')) {
        msg = "Unable to submit: Security policy blocking request.";
    } else if (msg.includes('valid URL') || msg.includes('Database not connected')) {
        msg = "System configuration error: Database not connected.";
     }

    throw new Error(msg);
  }
};

export const getClinicStatus = async () => {
    return { isOpen: true, message: "Open now" };
}

// --- Admin Functions ---

export const getAppointments = async () => {
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Appointment[];
};

export const updateAppointmentStatus = async (id: string, status: 'confirmed' | 'cancelled' | 'pending') => {
  const { error } = await supabase
    .from('appointments')
    .update({ status })
    .eq('id', id);

  if (error) throw error;
  return true;
};

// UI-Driven Deletion: Deletes specific IDs passed from the frontend
export const deleteAppointments = async (ids: string[]) => {
  // Check session first
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    throw new Error("You must be logged in to perform this action.");
  }

  if (!ids || ids.length === 0) {
    return true;
  }

  // Delete exactly the IDs provided
  const { error } = await supabase
    .from('appointments')
    .delete({ count: 'exact' })
    .in('id', ids);

  if (error) {
    console.error("Delete Error:", error);
    if (error.code === '42501' || error.message.includes('security')) {
        throw new Error("PERMISSION_DENIED_RLS");
    }
    throw error;
  }
  
  return true;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};