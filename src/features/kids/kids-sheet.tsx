import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Avatar } from '@/components/avatar';
import { Button } from '@/components/button';
import { Icon } from '@/components/icon';
import { Label } from '@/components/label';
import { Sheet } from '@/components/sheet';
import { KID_COLORS } from '@/lib/content';
import { useHereStore } from '@/store/here-store';

const schema = z.object({
  name: z.string().trim().min(1, 'A name to begin'),
  age: z.string(),
});
type KidForm = z.infer<typeof schema>;

interface KidsSheetProps {
  onClose: () => void;
}

/** A bottom sheet to add or remove children. */
export function KidsSheet({ onClose }: KidsSheetProps) {
  const kids = useHereStore((state) => state.data.kids);
  const addKid = useHereStore((state) => state.addKid);
  const removeKid = useHereStore((state) => state.removeKid);

  const { register, handleSubmit, watch, reset } = useForm<KidForm>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', age: '' },
  });
  const name = watch('name');

  const submit = handleSubmit((values) => {
    const digits = values.age.replace(/\D/g, '').slice(0, 2);
    addKid({
      id: `k${Date.now()}`,
      name: values.name.trim(),
      age: digits ? Number(digits) : null,
      color: KID_COLORS[kids.length % KID_COLORS.length],
      lastPlayed: null,
    });
    reset({ name: '', age: '' });
  });

  return (
    <Sheet ariaLabel="Your children" onClose={onClose}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 18,
        }}
      >
        <h2 style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 22, margin: 0 }}>
          Your children
        </h2>
        <button onClick={onClose} className="h-iconbtn h-tap" type="button" aria-label="Close">
          <Icon name="x" size={20} />
        </button>
      </div>

      {kids.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
          {kids.map((kid) => (
            <div
              key={kid.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 12px',
                borderRadius: 14,
                background: 'var(--surface-2)',
              }}
            >
              <Avatar kid={kid} size={40} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{kid.name}</div>
                {kid.age != null && (
                  <div style={{ fontSize: 12.5, color: 'var(--text-faint)' }}>age {kid.age}</div>
                )}
              </div>
              <button
                onClick={() => removeKid(kid.id)}
                className="h-iconbtn h-tap"
                type="button"
                aria-label={`Remove ${kid.name}`}
                style={{ width: 36, height: 36 }}
              >
                <Icon name="trash" size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={submit}>
        <Label style={{ marginBottom: 10 }}>Add a child</Label>
        <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
          <input
            {...register('name')}
            placeholder="Name"
            aria-label="Name"
            className="h-input"
            style={{ flex: 1 }}
          />
          <input
            {...register('age')}
            placeholder="Age"
            aria-label="Age"
            inputMode="numeric"
            className="h-input"
            style={{ width: 76, textAlign: 'center' }}
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          icon="plus"
          disabled={!name.trim()}
          style={{ width: '100%' }}
        >
          Add {name.trim() || 'child'}
        </Button>
      </form>
    </Sheet>
  );
}
