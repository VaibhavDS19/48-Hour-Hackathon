# subject priority difficulty
# difficulty is integer with hard equal to 3 and easy at 1
# priority is also integer
subjects = [ ["DBMS", 1, 3],
    ["OS", 2, 1],
    ["Software", 3, 3] ]

def sorts(subjects):
    subjects.sort(key = lambda sub: (sub[1], -sub[2]) )
    return subjects

def schedule(subjects, num, hours):
    priorities = dict()
    for i in subjects:
        if i[1] not in priorities.keys():
            priorities[i[1]] = []
        priorities[i[1]].append( [i[0], i[2]] )
    avg = hours/num
    return priorities

subjects = sorts(subjects)
priority = schedule(subjects, 3, 5)
for k,v in priority.items():
    print(k,v)