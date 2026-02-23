import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Trash2, Eye, EyeOff, Clock, User, Filter, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { messagesAPI } from '../../services/api';

const ManageMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchMessages = async () => {
    try {
      const params = {};
      if (filter !== 'all') params.status = filter;
      
      const response = await messagesAPI.getAll(params);
      setMessages(response.data.messages);
      setUnreadCount(response.data.unreadCount);
    } catch (error) {
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [filter]);

  const handleMarkRead = async (id, currentStatus) => {
    const newStatus = currentStatus === 'read' ? 'unread' : 'read';
    try {
      await messagesAPI.updateStatus(id, newStatus);
      fetchMessages();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return;
    
    try {
      await messagesAPI.delete(id);
      toast.success('Message deleted');
      if (selectedMessage?._id === id) setSelectedMessage(null);
      fetchMessages();
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const handleSelectMessage = async (message) => {
    setSelectedMessage(message);
    
    // Mark as read when opening
    if (message.status === 'unread') {
      try {
        await messagesAPI.updateStatus(message._id, 'read');
        fetchMessages();
      } catch (error) {
        console.error('Failed to mark as read');
      }
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const now = new Date();
    const diff = now - d;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-gta-orange animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-bebas text-4xl text-white tracking-wider mb-2">
          Messages
        </h1>
        <p className="font-rajdhani text-gray-400">
          {unreadCount} unread message{unreadCount !== 1 ? 's' : ''} in your inbox
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <Filter className="w-5 h-5 text-gray-400" />
        {['all', 'unread', 'read'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 font-rajdhani text-sm uppercase transition-all ${
              filter === f
                ? 'bg-gta-orange text-gta-bg'
                : 'bg-gta-surface text-text-muted hover:text-text-primary border border-gta-surfaceAlt'
            }`}
          >
            {f} {f === 'unread' && unreadCount > 0 && `(${unreadCount})`}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Messages list */}
        <div className="lg:col-span-1 space-y-2 max-h-[600px] overflow-y-auto">
          {messages.map((message) => (
            <motion.div
              key={message._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => handleSelectMessage(message)}
              className={`gta-card p-4 cursor-pointer transition-all ${
                selectedMessage?._id === message._id
                  ? 'border-gta-orange'
                  : message.status === 'unread'
                  ? 'border-gta-teal/50'
                  : ''
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    message.status === 'unread' ? 'bg-gta-teal' : 'bg-gta-surfaceAlt'
                  }`} />
                  <span className="font-rajdhani text-white font-semibold">
                    {message.name}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {formatDate(message.createdAt)}
                </span>
              </div>
              <p className="text-sm text-gray-400 line-clamp-2">
                {message.message}
              </p>
            </motion.div>
          ))}

          {messages.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No messages found
            </div>
          )}
        </div>

        {/* Message detail */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <motion.div
              key={selectedMessage._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="gta-card p-6"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6 pb-4 border-b border-gray-800">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gta-orange/20 flex items-center justify-center">
                      <User className="w-5 h-5 text-gta-orange" />
                    </div>
                    <div>
                      <h3 className="font-bebas text-xl text-white">
                        {selectedMessage.name}
                      </h3>
                      <p className="text-gta-teal text-sm">{selectedMessage.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    {new Date(selectedMessage.createdAt).toLocaleString()}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleMarkRead(selectedMessage._id, selectedMessage.status)}
                    className={`p-2 rounded transition-colors ${
                      selectedMessage.status === 'read'
                        ? 'text-gray-400 hover:bg-gray-800'
                        : 'text-gta-teal hover:bg-gta-teal/10'
                    }`}
                    title={selectedMessage.status === 'read' ? 'Mark unread' : 'Mark read'}
                  >
                    {selectedMessage.status === 'read' ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(selectedMessage._id)}
                    className="p-2 text-gta-red hover:bg-gta-red/10 rounded transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Message body */}
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                  {selectedMessage.message}
                </p>
              </div>

              {/* Reply button */}
              <div className="mt-6 pt-4 border-t border-gray-800">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: Portfolio Contact`}
                  className="gta-btn-primary inline-flex items-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  Reply via Email
                </a>
              </div>
            </motion.div>
          ) : (
            <div className="gta-card p-12 text-center">
              <Mail className="w-16 h-16 text-gray-700 mx-auto mb-4" />
              <p className="text-gray-500 font-rajdhani">
                Select a message to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageMessages;
