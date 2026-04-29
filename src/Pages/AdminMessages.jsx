import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { Mail, RefreshCcw, CheckCircle2 } from "lucide-react";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setMessages(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();

    const channel = supabase
      .channel("contact_messages_live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "contact_messages" },
        () => fetchMessages()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const markAsRead = async (id) => {
    await supabase
      .from("contact_messages")
      .update({ status: "read" })
      .eq("id", id);

    fetchMessages();
  };

  const newCount = messages.filter((m) => m.status === "new").length;

  return (
    <section className="min-h-screen bg-[#030014] text-white px-[5%] py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-10">
          <div>
            <p className="text-emerald-400 text-xs font-mono uppercase tracking-[0.35em]">
              Admin Console
            </p>
            <h1 className="text-4xl md:text-6xl font-black mt-2">
              Contact Messages
            </h1>
            <p className="text-slate-400 mt-2">
              Live portfolio contact submissions dashboard.
            </p>
          </div>

          <button
            onClick={fetchMessages}
            className="px-5 py-3 rounded-xl bg-emerald-500 text-black font-black flex items-center gap-2"
          >
            <RefreshCcw size={16} />
            Refresh
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <p className="text-slate-500 text-xs uppercase tracking-widest">
              Total Messages
            </p>
            <h2 className="text-3xl font-black mt-2">{messages.length}</h2>
          </div>

          <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-5">
            <p className="text-emerald-400 text-xs uppercase tracking-widest">
              New / Unread
            </p>
            <h2 className="text-3xl font-black mt-2 text-emerald-400">
              {newCount}
            </h2>
          </div>

          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <p className="text-slate-500 text-xs uppercase tracking-widest">
              Status
            </p>
            <h2 className="text-2xl font-black mt-2 text-amber-400">
              Live Sync
            </h2>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-400">Loading...</div>
        ) : (
          <div className="space-y-5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`rounded-3xl border p-6 bg-[#0a0f1a] ${
                  msg.status === "new"
                    ? "border-emerald-500/30"
                    : "border-white/10"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Mail className="text-emerald-400" size={18} />
                      <h3 className="text-xl font-black">{msg.name}</h3>

                      <span
                        className={`text-[10px] px-2 py-1 rounded-full uppercase tracking-widest ${
                          msg.status === "new"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-white/5 text-slate-500"
                        }`}
                      >
                        {msg.status}
                      </span>
                    </div>

                    <p className="text-slate-400 text-sm">{msg.email}</p>
                    <p className="text-slate-500 text-xs mt-1">
                      {new Date(msg.created_at).toLocaleString()}
                    </p>

                    <p className="text-slate-300 mt-5 leading-relaxed">
                      {msg.message}
                    </p>
                  </div>

                  {msg.status === "new" && (
                    <button
                      onClick={() => markAsRead(msg.id)}
                      className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2"
                    >
                      <CheckCircle2 size={14} />
                      Mark Read
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminMessages;